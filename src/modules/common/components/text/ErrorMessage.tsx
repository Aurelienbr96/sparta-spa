export const ErrorMessage = ({ children, ...props }: { children: string }) => {
  return (
    <p className="text-red-500" {...props}>
      {children}
    </p>
  );
};
