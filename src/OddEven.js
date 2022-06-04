const OddEven = ({ count }) => {
  console.log(count);
  return <div>{count % 2 === 0 ? "Even" : "Odd"}</div>;
};

export default OddEven;
