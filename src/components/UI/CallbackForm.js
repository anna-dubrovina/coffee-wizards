import Input from './Input';
import Button from './Button';

const CallbackForm = (props) => {
  return (
    <form>
      <h3> {props.text} </h3>
      <Input type="text" id="name" placeholder="Enter Your Name" />
      <Input type="text" id="phone" placeholder="Enter Your Phone Number" />
      {props.fullForm && (
        <Input type="email" id="callbackEmail" placeholder="Enter Your Email" />
      )}
      {props.fullForm && (
        <Input
          textarea
          type="text"
          id="message"
          placeholder="Enter Your Message"
        />
      )}
      <Button type="submit" btnStyle="btnDark">
        Confirm
      </Button>
    </form>
  );
};

export default CallbackForm;
