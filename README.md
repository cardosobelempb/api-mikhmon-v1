I can’t do advanced data analysis right now. Can I help you with something else?

---

Mas eu **posso gerar o arquivo `.md` aqui mesmo**, no texto, e você pode copiar/colar em um arquivo chamado `README.md` ou similar.

Abaixo está o **Markdown completo** com todas as informações que discutimos, organizado como documentação técnica do projeto.

---

# ✅ **DOCUMENTAÇÃO - API Hotspot (Mikhmon-like) com Node.js + TypeScript**

---

## 📌 1. Visão Geral do Projeto

Este projeto é uma API REST para gerenciamento de Hotspot RouterOS (similar ao Mikhmon), com:

- Geração de vouchers
- CRUD de Hotspot Profiles
- Autenticação JWT
- RBAC (roles ADMIN / USER)
- Banco de dados com TypeORM
- Logs estruturados com Pino
- Estrutura escalável e limpa (Clean Architecture / SOLID)

---

## 📌 2. Stack e Ferramentas

| Item           | Tecnologia                                 |
| -------------- | ------------------------------------------ |
| Linguagem      | TypeScript                                 |
| Framework      | Node.js + Express                          |
| ORM            | TypeORM                                    |
| Banco de dados | PostgreSQL / MySQL / SQLite (configurável) |
| Autenticação   | JWT (`jsonwebtoken` v9+)                   |
| Validação      | Zod                                        |
| Logs           | Pino                                       |
| RouterOS       | `node-routeros`                            |

---

## 📌 3. Estrutura de Pastas (recomendada)

```
src/
  api/
    controllers/
      AuthController.ts
      ProfileController.ts
    routes/
      auth.routes.ts
      profile.routes.ts
      user.routes.ts
    middlewares/
      auth.middleware.ts
      role.middleware.ts
      validation.middleware.ts
  config/
    jwt.config.ts
    router.config.ts
    appConfig.ts
  entities/
    User.ts
  services/
    AuthService.ts
    HotspotProfileService.ts
  infra/
    data-source.ts
    RouterOSClient.ts
    logger.ts
  schemas/
    auth.schema.ts
  types/
    role.ts
```

---

## 📌 4. Rotas Principais

### ✅ Auth

| Método | Rota             | Acesso             |
| ------ | ---------------- | ------------------ |
| POST   | `/auth/login`    | público            |
| POST   | `/auth/register` | público (ou ADMIN) |

### ✅ Profiles

| Método | Rota            | Acesso     |
| ------ | --------------- | ---------- |
| GET    | `/profiles`     | USER/ADMIN |
| POST   | `/profiles`     | ADMIN      |
| DELETE | `/profiles/:id` | ADMIN      |

---

## 📌 5. Schemas de Validação (Zod)

### `auth.schema.ts`

```ts
import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
})

export const registerSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'USER']).optional(),
})

export type LoginDTO = z.infer<typeof loginSchema>
export type RegisterDTO = z.infer<typeof registerSchema>
```

---

## 📌 6. RBAC (Roles)

### `types/role.ts`

```ts
export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
```

---

## 📌 7. Middleware de Autenticação (JWT)

### `auth.middleware.ts`

```ts
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { jwtConfig } from '../../config/jwt.config'
import { Role } from '../../types/role'

export interface AuthRequest extends Request {
  user?: {
    id: string
    role: Role
  }
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).json({ error: 'Token ausente' })

  const token = auth.split(' ')[1]

  try {
    const decoded = jwt.verify(token, jwtConfig.secret) as any
    req.user = { id: decoded.sub, role: decoded.role as Role }
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido' })
  }
}
```

---

## 📌 8. Middleware de Roles

### `role.middleware.ts`

```ts
import { Response, NextFunction } from 'express'
import { AuthRequest } from './auth.middleware'
import { Role } from '../../types/role'

export function roleMiddleware(roles: Role[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: 'Não autorizado' })

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Permissão insuficiente' })
    }

    next()
  }
}
```

---

## 📌 9. Profile Routes

### `profile.routes.ts`

```ts
import { Router } from 'express'
import { ProfileController } from '../controllers/ProfileController'
import { authMiddleware } from '../middlewares/auth.middleware'
import { roleMiddleware } from '../middlewares/role.middleware'
import { Role } from '../../types/role'

const router = Router()

router.get(
  '/',
  authMiddleware,
  roleMiddleware([Role.ADMIN, Role.USER]),
  ProfileController.list,
)

router.post(
  '/',
  authMiddleware,
  roleMiddleware([Role.ADMIN]),
  ProfileController.create,
)

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware([Role.ADMIN]),
  ProfileController.remove,
)

export default router
```

---

## 📌 10. Profile Controller (com tipagem correta)

### `ProfileController.ts`

```ts
import { Request, Response } from 'express'
import { RouterOSClient } from '../../infra/RouterOSClient'
import { HotspotProfileService } from '../../services/HotspotProfileService'
import { logger } from '../../infra/logger'
import { HotspotProfileResponse } from '../../services/HotspotProfileService'

export class ProfileController {
  static async list(req: Request, res: Response) {
    const client = new RouterOSClient()
    const service = new HotspotProfileService(client)

    try {
      await client.connect()
      const profiles: HotspotProfileResponse[] = await service.list()
      return res.json(profiles)
    } catch (err) {
      logger.error({ err }, 'Erro ao listar profiles')
      return res.status(500).json({ error: 'Erro interno' })
    } finally {
      await client.disconnect()
    }
  }

  static async create(req: Request, res: Response) {
    const { name, rateLimit, sessionTimeout } = req.body

    if (!name || !rateLimit) {
      return res.status(400).json({
        error: 'name e rateLimit são obrigatórios',
      })
    }

    const client = new RouterOSClient()
    const service = new HotspotProfileService(client)

    try {
      await client.connect()
      const result = await service.create({ name, rateLimit, sessionTimeout })
      return res.status(201).json(result)
    } catch (err) {
      logger.error({ err }, 'Erro ao criar profile')
      return res.status(500).json({ error: 'Erro interno' })
    } finally {
      await client.disconnect()
    }
  }

  static async remove(req: Request, res: Response) {
    const { id } = req.params

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: 'ID inválido' })
    }

    const client = new RouterOSClient()
    const service = new HotspotProfileService(client)

    try {
      await client.connect()
      await service.delete(id)
      return res.status(204).send()
    } catch (err) {
      logger.error({ err }, 'Erro ao remover profile')
      return res.status(500).json({ error: 'Erro interno' })
    } finally {
      await client.disconnect()
    }
  }
}
```

---

## 📌 11. TypeORM Entity (User)

### `User.ts`

```ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm'
import { Role } from '../types/role'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  username!: string

  @Column()
  password!: string

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role!: Role

  @CreateDateColumn()
  createdAt!: Date
}
```

---

## 📌 12. Boas práticas e Observações

### ✅ Por que usar `enum` no Role?

Porque o TypeORM precisa do valor em runtime.
`type Role = "ADMIN" | "USER"` **não funciona** com decorators.

### ✅ Evite circular dependencies

Sempre separe enums em arquivos isolados.

### ✅ Use Zod para validação

Evita bugs de payload inválido.

### ✅ Logging estruturado

Pino permite logs com `JSON` e fácil ingestão em ELK/Graylog.
