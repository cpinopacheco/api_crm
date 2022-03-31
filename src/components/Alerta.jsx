export const Alerta = ({ children }) => {
  return (
    <div className="text-center my-2 p-2 bg-red-500 text-white font-bold uppercase">
      {children}
    </div>
  );
};
