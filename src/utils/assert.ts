export function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    try {
      throw new Error(msg);
    } catch (error) {
      if (error instanceof Error && Error.captureStackTrace) {
        Error.captureStackTrace(error, assert);
      }
      throw error;
    }
  }
}
