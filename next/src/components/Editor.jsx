"use client";

import {useState} from "react";

export default function Editor(props) {
  const [isCreate, setIsCreate] = useState(props.isCreate);


  return (
    isCreate ? (
        <div>Create</div>
    ): (
        <div>Edit</div>
    )
  )
}
