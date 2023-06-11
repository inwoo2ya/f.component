/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from "react";
import _classNames from "classnames";
import { TagProps } from "@interfaces/*";
import { css, Interpolation, Theme } from "@emotion/react";
import { Button } from "../Form/Button";

interface tagsValue {
  children?: JSX.Element[];
  removeButton?: JSX.Element;
}

const pushRemoveButton = (tag: JSX.Element, func: () => void) => {
  return React.cloneElement(tag, {
    ...tag.props,
    onClick: func,
  });
};

export const Tag = (props: TagProps) => {
  const { children, classNames, style, circle, onDelete } = props;

  const tagLayout = useMemo(() => {
    if (!onDelete) return;
    let tagsValue: tagsValue = { children: [] };
    (children as JSX.Element[])?.filter((tag) => {
      tag.type === Tag.Remover
        ? (tagsValue.removeButton = pushRemoveButton(tag, onDelete))
        : tagsValue.children?.push(tag);
      // console.log(tagsValue.children);
    });
    return tagsValue;
  }, [children, onDelete]);

  const circleCSS: Interpolation<Theme> = useMemo(() => {
    if (!circle) return {};

    return {
      margin: "0 auto",
      borderRadius: "9999px",
    };
  }, [circle]);

  return (
    <div className={_classNames(classNames)} style={style} css={circleCSS}>
      {tagLayout?.children}
      {tagLayout?.removeButton}
    </div>
  );
};

Tag.Remover = Button;
