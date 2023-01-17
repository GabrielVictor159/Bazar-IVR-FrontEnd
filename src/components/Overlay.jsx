export default function Overlay(props) {
  return (
    <>
    { props.handler!==false
        ?
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(10,10,10,0.6)",
        zIndex: 10,
      }}
    >
        <div onClick={e=>props.setHandler()} style={{width:'100%', height:'100%', position:'absolute', left:0, top:0, zIndex:7}}/>
        <div style={{  display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', zIndex:10}}>
        {props.children}
        </div>
      
    </div>
    :<></>
    }
    </>
  );
}
