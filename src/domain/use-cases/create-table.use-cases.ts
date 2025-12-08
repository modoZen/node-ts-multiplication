export interface CreatableUseCase {
  execute: (options: CreateTableOptions) => string;
}

interface CreateTableOptions {
  base: number;
  limit?: number;
}

export class CreateTable implements CreatableUseCase {
  constructor() {
    /**
     * DI - Dependency Injection
     */
  }

  execute({ base, limit = 10 }: CreateTableOptions) {
    let template = `===================\n    Tabla del ${base}    \n===================\n\n`;
    for (let number = 1; number <= limit; number++) {
      const newLine = `${base} x ${number} = ${base * number}`;
      template += `${newLine}`;

      if (number < limit) template += `\n`;
    }
    return template;
  }
}
