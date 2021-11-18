import React, { FC, Ref, useLayoutEffect, useRef } from "react";
import $ from "jquery";
import { IVectorMapProps, MapObject } from "../../types";
import { MapContainer } from "../MapContainer";

export const VectorMap: FC<IVectorMapProps> = ({
  map,
  mapRef,
  style,
  className,
  ...props
}) => {
  const containerRef = useRef<JQuery | null>(null);
  useLayoutEffect(() => {
    const mapContainer = containerRef.current;
    console.log("test")
    if (!map) {
      console.error("[react-jvectormap]: no map was loaded!");
    }
    const { name, content } = map;
    $.fn.vectorMap("addMap", name, content);
    if (mapContainer) {
      $(mapContainer).vectorMap({
        map: name,
        ...props,
      });
      if (map && mapRef?.current === null) {
        mapRef.current = $(mapContainer).vectorMap(
          "get",
          "mapObject",
        ) as unknown as MapObject;
      }
    }
  }, [map, mapRef, props]);

  return (
    <MapContainer
      className={className}
      style={style}
      containerRef={containerRef as Ref<HTMLDivElement>}
    />
  );
};
