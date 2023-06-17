"use client";
import Image from "next/image";
import { Inter } from "@next/font/google";
import {
  Accordion,
  Box,
  Button,
  Checkbox,
  Drawer,
  InfinityScroller,
  Input,
  LinkButton,
  Modal,
  Radio,
  Searcher,
  Select,
  Tabs,
  Tag,
  Toast,
} from "@lavarwave/f.component";
import style from "./page.module.css";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [select, setSelect] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectIdx, setSelectIdx] = useState("");
  const tabsArray = [
    ["first", <div>첫번째 본문</div>],
    ["second", <div>두번째 본문</div>],
    ["third", <div>세번째 본문</div>],
    ["fourth", <div>네번째 본문</div>],
    ["fifth", <div>다섯번째 본문</div>],
  ];

  const dropdownArray = [
    { data: 1, title: "one" },
    { data: 2, title: "two" },
    { data: 3, title: "three" },
    { data: 4, title: "four" },
    { data: 5, title: "five" },
  ];
  const [page, setPage] = useState(0);
  const infinityScrollData = [
    [
      "사진0",
      "사진1",
      "사진2",
      "사진3",
      "사진4",
      "사진5",
      "사진6",
      "사진7",
      "사진8",
      "사진9",
      "사진10",
    ],
    [
      "1사진0",
      "1사진1",
      "1사진2",
      "1사진3",
      "1사진4",
      "1사진5",
      "1사진6",
      "1사진7",
      "1사진8",
      "1사진9",
      "1사진10",
    ],
    [
      "2사진0",
      "2사진1",
      "2사진2",
      "2사진3",
      "2사진4",
      "2사진5",
      "2사진6",
      "2사진7",
      "2사진8",
      "2사진9",
      "2사진10",
    ],
    [
      "3사진0",
      "3사진1",
      "3사진2",
      "3사진3",
      "3사진4",
      "3사진5",
      "3사진6",
      "3사진7",
      "3사진8",
      "3사진9",
      "3사진10",
    ],
  ];
  const AccordionArray = [
    {
      title: "Accordion Item 1",
      contents:
        "안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕",
    },
    {
      title: "Accordion Item 2",
      contents:
        "잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가잘가",
    },
  ];
  const TagArray = [{ title: "Hello, World" }];
  const [list, setList] = useState(infinityScrollData[0]);
  const bottomHit = () => {
    if (page < infinityScrollData.length - 1) setPage((page) => page + 1);
  };

  useEffect(() => {
    // console.log(page, infinityScrollData.length, list);/
    if (0 < page) {
      setList((list) => list.concat(infinityScrollData[page]));
    }
  }, [page]);

  const multi = true;
  const [onCloseIdx, setOnCloseIdx] = useState<number>();
  const title: string = "선택하세요";
  const [accordion, setAccordion] = useState<string[] | string>();
  const [toastStatus, setToastStatus] = useState<boolean>(false);
  const getAccordionSelectedValue = (value: string[] | string) => {
    value;
    if (typeof value === "object") {
      return setAccordion([...value]);
    }
    return setAccordion(value);
  };
  return (
    <>
      <main className={style.main}>
        <Accordion
          classNames={"w-[1000px]"}
          multiSelectable={false}
          onSelect={getAccordionSelectedValue}
        >
          {AccordionArray.map((v, k) => (
            <Accordion.Item key={k}>
              <Accordion.Head
                classNames={
                  accordion?.includes(v.title) || accordion === v.title
                    ? "bg-gray-200"
                    : null
                }
              >
                {v.title}
                <Accordion.Chevron
                  classNames={
                    accordion?.includes(v.title) || accordion === v.title
                      ? "duration-300 rotate-180 "
                      : "duration-300"
                  }
                >
                  ▽
                </Accordion.Chevron>
              </Accordion.Head>
              {accordion?.includes(v.title) || accordion === v.title ? (
                <Accordion.Detail>{v.contents}</Accordion.Detail>
              ) : (
                ""
              )}
            </Accordion.Item>
          ))}
        </Accordion>
        <Tabs classNames={"w-full "}>
          <Tabs.Header classNames={"flex bg-blue-200"}>
            {tabsArray.map((v, k) => (
              <Box
                as
                div
                key={k}
                classNames={[
                  select == k ? "border-b-[2px] border-b-sky-400 " : "",
                ]}
              >
                <Tabs.TabButton
                  classNames={["px-2"]}
                  onClick={() => {
                    setSelect(k);
                  }}
                >
                  {v[0]}
                </Tabs.TabButton>
              </Box>
            ))}
          </Tabs.Header>
          <Tabs.Body classNames={["p-5", "border-[1px]"]} currentIdx={select}>
            {tabsArray.map((v, k) => {
              if (select === k) {
                return <Tabs.Item key={k}>{v[1]}</Tabs.Item>;
              }
            })}
          </Tabs.Body>
        </Tabs>
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
        <div className=" font-semibold">라디오</div>
        <div className="flex">
          <Radio>
            <Radio.Set name="test">
              <Radio.Option id="1" value="일번" />1
              <Radio.Option id="2" valud="이번" />2
            </Radio.Set>
            <Radio.Checked classNames={"bg-blue-200 border-[1px]"} />
            <Radio.UnChecked classNames={"border-[1px]"} />
          </Radio>
        </div>
        <div className=" font-semibold">체크박스</div>
        <div className="flex">
          <Checkbox
            id="helloWorld"
            value="하이"
            checked={false}
            onClick={(e: any) => {
              if (e.target.checked) {
                console.log(e.target.id);
                console.log(e.target.value);
              }
            }}
          >
            <Checkbox.Checked
              classNames={"bg-green-500 border-[1px]"}
            ></Checkbox.Checked>
            <Checkbox.Unchecked
              classNames={" border-[1px] "}
            ></Checkbox.Unchecked>
          </Checkbox>
          <label htmlFor="helloWorld">인사해보자</label>
        </div>
        <Tag
          classNames={["bg-sky-200", ""]}
          circle
          onDelete={() => {
            console.log("삭제!");
          }}
        >
          <div className="p-1 inline-block">{TagArray[0].title}</div>
          <Tag.Remover classNames={"mx-2"}>X</Tag.Remover>
        </Tag>
        <Select
          classNames={"w-[150px] text-center"}
          multiSelectable={multi}
          onSelect={(value: string) => {
            setSelectIdx(value);
          }}
          valueFormatter={(data: any) => {
            console.log(data);
          }}
        >
          <Select.Label
            classNames={selectIdx == title ? "text-gray-500" : null}
            title={title}
          />
          {/* <Select.Label>
            {selectIdx[0] !== undefined && selectIdx !== "" ? (
              <>{selectIdx}</>
            ) : (
              <p>배고프다</p>
            )}
          </Select.Label> */}
          <Select.Options
            classNames={
              "absolute top-full right-0 z-20 w-full  border-t-[1px] bg-white"
            }
          >
            <Select.OptionGroup title={"Number"}>
              {dropdownArray.map((v, k) => (
                <Select.Option
                  key={k}
                  classNames={[
                    "hover:bg-sky-200",
                    v.title == selectIdx && !multi
                      ? "font-semibold border-b-[2px] border-red-500"
                      : null,
                  ]}
                  data={v}
                  // asInitial={v.data == 1 ? true : false}
                >
                  {v.title}
                </Select.Option>
              ))}
            </Select.OptionGroup>
          </Select.Options>
          <Select.Chevron>▽</Select.Chevron>
        </Select>
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
          <Searcher.Input placeholder="검색하세요"></Searcher.Input>
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
        <Button
          classNames={["bg-green-200", "p-2"]}
          onClick={() => {
            setModalOpen(true);
          }}
        >
          ModalOpen
        </Button>
        <Modal
          status={modalOpen}
          classNames={["bg-white", "w-[400px] h-[400px]", "p-2", ""]}
          scrollposition={"right"}
          onClose={() => {
            setModalOpen(false);
          }}
          onSubmit={() => {
            console.log("Submit!!!!!");
          }}
        >
          <Modal.Backdrop
            onClick={() => {
              setModalOpen(false);
            }}
          />

          <Modal.Header>
            누가 불 껐어!?
            <Modal.CloseButton classNames={["absolute top-0 right-0"]}>
              X
            </Modal.CloseButton>
          </Modal.Header>
          <Modal.Body>
            불 좀 켜줘!
            <p>
              니나니뇨
              <br />
              니나니뇨
              <br />
              니나니뇨
              <br />
              니나니뇨
              <br />
              니나니뇨
              <br />
              니나니뇨
              <br />
              니나니뇨
              <br />
              니나니뇨
              <br />
              니나니뇨
              <br />
              니나니뇨
              <br />
              니나니뇨
              <br />
              니나니뇨
              <br />
              니나니뇨
              <br />
              니나니뇨
              <br />
              니나니뇨
              <br />
              니나니뇨
              <br />
              니나니뇨
              <br />
              니나니뇨
              <br />
              니나니뇨
              <br />
              니나니뇨
              <br />
              니나니뇨
              <br />
            </p>
          </Modal.Body>
          <Modal.Footer classNames={["text-right", "py-1"]}>
            <Modal.SubmitButton classNames={["p-1", "bg-sky-300"]}>
              확인
            </Modal.SubmitButton>
            <Modal.CloseButton classNames={["p-1 ml-2", "bg-red-300"]}>
              닫기
            </Modal.CloseButton>
          </Modal.Footer>
        </Modal>
        <Button
          onClick={() => {
            setToastStatus(true);
          }}
          classNames={"bg-pink-200 p-2"}
        >
          토스터기
        </Button>
        <Toast
          status={toastStatus}
          setStatus={(value: boolean) => {
            setToastStatus(value);
          }}
          position={"topLeft"}
          onCloseIdx={onCloseIdx}
          duration={5000}
          isMultiple
          classNames={"bg-gray-200 w-[350px] h-[100px] my-2"}
        >
          <div className="text-center">Toast예요ㅎㅎ</div>
          <Button
            classNames={"absolute top-0 right-2"}
            onClick={(e: any) => {
              console.log((e.target.parentElement.id *= 1));
              setOnCloseIdx((e.target.parentElement.id *= 1)); //숫자변환
              setToastStatus(false);
            }}
          >
            X
          </Button>
        </Toast>
        <InfinityScroller
          classNames={
            "relative items-center w-[1000px] h-[500px] overflow-y-auto"
          }
          onBottomHit={bottomHit}
          loader={
            <div className="w-full justify-center text-center items-center">
              loading...
            </div>
          }
          totalPage={infinityScrollData.length - 1}
          currentPage={page}
        >
          {list.map((v, k) => (
            <div
              key={k}
              className={
                "w-[350px] h-[300px] flex flex-col bg-white m-4 shadow-slate-500 shadow-lg rounded-[6px]"
              }
            >
              {v}
            </div>
          ))}
        </InfinityScroller>
      </main>
      <Drawer
        from="top"
        query={{ drawer: "open" }}
        classNames={["h-[200px]", "bg-gray-200", "text-center", "duration-200"]}
        status={visible}
        darkenedBackdrop={true}
        backdropOnClick={() => {
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
