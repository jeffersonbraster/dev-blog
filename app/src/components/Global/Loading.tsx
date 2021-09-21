const Loading = () => {
  return (
    <div className="d-flex justify-content-center my-4">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Carregando posts...</span>
      </div>
    </div>
  );
};

export default Loading;
