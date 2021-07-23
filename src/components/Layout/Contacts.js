import Button from '../UI/Button';

const Contacts = (props) => {
  return (
    <div>
      <ul>
        <li> coffee@wizards.com </li>
        <li> (555) 555 55 55</li>
        <li> 10:00 AM – 7:00 PM </li>
      </ul>
      <Button btnStyle={props.dark && 'btnDark'}>Callback Me</Button>
    </div>
  );
};

export default Contacts;
