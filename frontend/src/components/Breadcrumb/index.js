import styled from "styled-components";

export const Breadcrumb = (props)=>{
  const { name } = props;
  return (
    <h1>{name}</h1>
  )
}