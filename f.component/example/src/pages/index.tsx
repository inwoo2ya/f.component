"use client";
import Image from "next/image";
import { Inter } from "@next/font/google";
import {
  Box,
  Button,
  Drawer,
  Input,
  LinkButton,
  Searcher,
} from "@lavarwave/f.component";
import style from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <main className={style.main}>
        <Box>
          <Box as="span" forDesktop>
            I'm on Desktop
          </Box>
          <Box as="div" forTablet>
            I'm on Tablet
          </Box>
          <Box as="p" forMobile>
            I'm on Mobile
          </Box>
          <Box forNonDesktop>I'm on non Desktop</Box>
          <Box as="span" forNonTablet>
            I'm on non Tablet
          </Box>
          <Box
            style={{
              width: "400px",
            }}
            ratio={1 / 4}
          >
            <div>Ratio Box</div>
          </Box>
          <Box
            classNames={["w-[300px]", "bg-black text-white"]}
            ratio={3 / 4}
            forNonMobile
            circle
            onClick={() => console.log("clicked!")}
          >
            <Box>I'm on non Mobile</Box>
          </Box>
        </Box>
        <Button classNames="p-2 bg-green-200" disabled>
          testButton
          <Button.Disabled hoverable={true} classNames={"p-2 bg-gray-200"} />
          <Button.Loading>Loading</Button.Loading>
        </Button>
        <LinkButton href="/">하이</LinkButton>
        <Input
          classNames="bg-white"
          placeholder="안녕하세요"
          multilined
        ></Input>
        <Searcher disabledEnter={false} queryKey={"d"}>
          <Searcher.Input></Searcher.Input>
          <Searcher.Submit>
            검색
            <Searcher.Submit.Disabled />
          </Searcher.Submit>
        </Searcher>
        <Button
          onClick={() => {
            setVisible(!visible);
          }}
        >
          Drawer
        </Button>
      </main>
      <Drawer
        from="right"
        query={{ p: "true" }}
        classNames={["w-[200px]", "bg-gray-200", "text-center", "duration-200"]}
        status={visible}
        withoutQueryString={false}
        darkenedbackdrop={false}
        onClick={() => {
          setVisible(false); // 뒷배경을 클릭하면 visible에 false 전달
        }}
      >
        <Box as="div" className="p-2">
          <Box as="h1" classNames={["font-bold text-xl"]}>
            까꿍
          </Box>
          <Button
            classNames={["absolute top-1 right-2"]}
            onClick={() => {
              setVisible(false);
            }}
          >
            X
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
