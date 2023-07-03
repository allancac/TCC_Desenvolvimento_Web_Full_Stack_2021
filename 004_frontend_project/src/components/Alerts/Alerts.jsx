import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertDismissible({ show, setShow, content }) {
  const { variant, heading, textArray } = content;
  return (
    <>
      <Alert show={show} variant={variant}>
        <Alert.Heading> {heading}</Alert.Heading>
        <hr />
        <ul>
          {textArray.map((text, i) => (
            <li key={i}>{text}</li>
          ))}
        </ul>

        <div className='d-flex justify-content-end'>
          <Button onClick={() => setShow(false)} variant={`outline-${variant}`}>
            Fechar
          </Button>
        </div>
      </Alert>
    </>
  );
}

export default AlertDismissible;
