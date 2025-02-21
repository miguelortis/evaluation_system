export const getLabelByStatus = (key) => {
  switch (key) {
    case "completed":
      return "Completado";
    case "pending":
      return "Pendiente";

    default:
      return key;
  }
};
