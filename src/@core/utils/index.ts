export const handleFileChange = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string;
      resolve(base64);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

export const formatarData = (data: string | Date): string => {
  const date = new Date(data);
  const dataComAjusteFusoHorario = new Date(
    date.getTime() + date.getTimezoneOffset() * 60000
  );
  if (isNaN(dataComAjusteFusoHorario.getTime())) {
    return "Invalid Date";
  }
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(dataComAjusteFusoHorario);
};
