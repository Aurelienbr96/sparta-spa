function NotFoundTemplate() {
  return (
    <div data-testid="not-found-screen" className="h-100 w-100 row align-items-center justify-center">
      <h1>404</h1>
      <p>{"Cette page n'existe pas !"}</p>
    </div>
  );
}

export default NotFoundTemplate;
