import type { ECharts, EChartsOption, SetOptionOpts } from "echarts";
import { getInstanceByDom, init } from "echarts";
import type { CSSProperties, JSX } from "react";
import { useEffect, useRef } from "react";

export interface ReactEChartsProps {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: "light" | "dark";
}

export function ReactECharts({
  option,
  style,
  settings,
  loading,
  theme,
}: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Khởi tạo chart
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme);
    }

    // Sử dụng ResizeObserver để theo dõi thay đổi kích thước của container
    const resizeObserver = new ResizeObserver(() => {
      // Bọc lệnh resize bên trong requestAnimationFrame để tránh loop notifications
      requestAnimationFrame(() => {
        try {
          chart?.resize();
        } catch (error) {
          console.error("ResizeObserver error:", error);
        }
      });
    });
    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }

    // Lắng nghe sự kiện thay đổi kích thước cửa sổ làm dự phòng
    function handleWindowResize() {
      chart?.resize();
    }
    window.addEventListener("resize", handleWindowResize);

    // Cleanup: hủy bỏ observer và sự kiện khi component unmount
    return () => {
      chart?.dispose();
      window.removeEventListener("resize", handleWindowResize);
      resizeObserver.disconnect();
    };
  }, [theme]);

  useEffect(() => {
    // Cập nhật option cho chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart?.setOption(option, settings);
    }
  }, [option, settings, theme]);

  useEffect(() => {
    // Hiển thị hoặc ẩn Loading của chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      loading ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [loading, theme]);

  return <div ref={chartRef} style={{ ...style }} />;
}
