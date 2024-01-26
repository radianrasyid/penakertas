"use client";

const Playground = ({ data }: { data: any }) => {
  return <div onClick={() => console.log(data)}>Playground</div>;
};

export default Playground;
