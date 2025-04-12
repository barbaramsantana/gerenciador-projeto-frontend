import { describe, expect, it } from "vitest";
import { formatarData, handleFileChange } from "../../utils";

describe("handleFileChange", () => {
  it("deve resolver a base64 string corretamente", async () => {
    const mockFile = new File(['teste de conteúdo'], 'imagem.png', { type: 'image/png' });
    const base64 = await handleFileChange(mockFile)

    expect(base64).toMatch(/^data:image\/png;base64,/);
  });
});

describe("formatarData", () => {
    it('deve formatar corretamente uma string de data', () => {
        const resultado = formatarData('2023-04-12');
        expect(resultado).toMatch(/12 de abril de 2023/);
      });
    
      it('deve formatar corretamente uma instância Date', () => {
        const resultado = formatarData(new Date('2022-10-20'));
        expect(resultado).toMatch(/20 de outubro de 2022/);
      });
    
      it('deve lidar com datas em timezone diferentes corretamente', () => {
        const date = new Date('2025-01-01T03:00:00.000Z'); // UTC
        const resultado = formatarData(date);
        expect(typeof resultado).toBe('string');
        expect(resultado).toMatch(/01 de janeiro de 2025/); // Formato genérico
      });
    
      it('deve retornar "Invalid Date" se a data for inválida', () => {
        const resultado = formatarData('data-invalida' as any);
        expect(resultado).toContain('Invalid');
      });
})
