import React, { useState } from "react";

export default function ReactCalculator() {
  let [input, setInput] = useState({
    num1: "",
    num2: "",
  });

  let [output, setOutput] = useState({
    outnum1:"",
    outnum2:"",
    operation:"",
    answer:""
  });

  let [validate,setValidate] = useState({
    status:true,
    reason:""
  });

  function calculate(operation) {
    if(input.num1===""){
        setValidate({...validate,status:false,reason:"Num1 cannot be Empty."})
        return;
    }
    if(input.num2===""){
        setValidate({...validate,status:false,reason:"Num2 cannot be Empty."})
        return;
    }
    switch (operation) {
      case "+":
        setOutput({...output,outnum1:input.num1,outnum2:input.num2,answer:input.num1 + input.num2,operation:operation});
        break;
      case "-":
        setOutput({...output,outnum1:input.num1,outnum2:input.num2,answer:input.num1 - input.num2,operation:operation});
        break;
      case "*":
        setOutput({...output,outnum1:input.num1,outnum2:input.num2,answer:input.num1 * input.num2,operation:operation});
        break;
      case "/":
        if(+input.num2===0){
            setValidate({...validate,status:false,reason:"Cannot divide by 0"});
            break;
        }
        setOutput({...output,outnum1:input.num1,outnum2:input.num2,answer:input.num1 / input.num2,operation:operation});
        break;
      default:
        break;
    }
    setInput({ ...input, num1: "", num2: "" });
  }

  function onChangeFunc(e){
    setInput({ ...input, [e.target.name]: +e.target.value })
    setOutput({...output,outnum1:"",outnum2:"",answer:"",operation:""})
    setValidate({...validate,status:true,reason:""})
  }

  return (
    <div className="calculator-container">
      <h1>React Calculator</h1>
      <input
        type="number"
        name="num1"
        placeholder="Num1"
        onChange={onChangeFunc}
        value={input.num1}
      />
      <input
        type="number"
        name="num2"
        placeholder="Num2"
        onChange={onChangeFunc}
        value={input.num2}
      />
      <div className="buttons-div">
        <button onClick={()=>calculate("+")}>+</button>
        <button onClick={()=>calculate("-")}>-</button>
        <button onClick={()=>calculate("*")}>*</button>
        <button onClick={()=>calculate("/")}>/</button>
      </div>
      {
        validate.status?(output.answer!=="" && (
            <div className="success">
                <p>Success</p>
                <p>Result : {output.outnum1} {output.operation} {output.outnum2} = {output.answer}</p>
            </div>
        )):(
            <div className="error">
                <p>Error</p>
                <p>{validate.reason}</p>
            </div>
        )
      }
    </div>
  );
}
