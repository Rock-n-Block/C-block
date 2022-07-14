/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { StringSchema, ArraySchema } from 'yup';

declare const DEBUG: boolean;

interface Window {
  celo: any;
}

declare module 'yup' {
  interface StringSchema {
    latinNumbersSpecialChars(message: string): StringSchema;
  }

  interface ArraySchema {
    unique(message, mapper, pathCreator): ArraySchema;
  }
}
