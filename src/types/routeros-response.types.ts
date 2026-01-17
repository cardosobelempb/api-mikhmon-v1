// types/RouterOSResponse.ts

/**
 * Representa uma resposta genérica do RouterOS
 * As chaves são strings porque o RouterOS retorna tudo como texto
 */
export type RouterOSResponse = Record<string, string>
