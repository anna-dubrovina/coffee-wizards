const Section = (props) => {
  return (
    <section className={props.light && 'bg-light'}>
      <div className={props.className + ' container'}>{props.children}</div>
    </section>
  );
};

export default Section;
