import { Pagination } from 'react-bootstrap';

export const Paginacao = ({ total, limit, offset, alteraPagina }) => {
  const paginas = Math.ceil(total / limit);

  const handleClick = (pagina) => {
    const newOffset = (pagina - 1) * limit;
    alteraPagina(newOffset);
  };

  return (
    <Pagination>
      <Pagination.First onClick={() => handleClick(1)} />
      <Pagination.Prev
        onClick={() => handleClick(Math.max(1, Math.ceil(offset / limit)))}
      />
      {Array.from({ length: paginas }, (_, index) => index + 1).map(
        (pagina) => (
          <Pagination.Item
            key={pagina}
            active={offset === (pagina - 1) * limit}
            onClick={() => handleClick(pagina)}
          >
            {pagina}
          </Pagination.Item>
        )
      )}
      <Pagination.Next
        onClick={() =>
          handleClick(Math.min(Math.ceil(total/limit)-1, Math.ceil(offset / limit) + 1)+1)
        }
      />
      <Pagination.Last onClick={() => handleClick(paginas)} />
    </Pagination>
  );
};
