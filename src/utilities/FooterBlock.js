export default function FooterBlock({ block_header, item_array }) {
  return (
    <>
      <div className="block_wrapper">
        <div className="block_header">
          <h3 className="block_header_line">{block_header}</h3>
        </div>

        <div className="block_body">
          {item_array.map((item) => (
            <BodyItem key={item._id} item_name={item.item_name} />
          ))}
        </div>
      </div>
    </>
  );
}

// const BodyItem = (item_name) => {
//   return ;
// };

function BodyItem({ item_name }) {
  return (
    <>
      <div id="block_body_item">{item_name}</div>
    </>
  );
}
