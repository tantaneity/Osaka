export interface StatisticsCardData {
  color: string;
  icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string | undefined;
    titleId?: string | undefined;
} & React.RefAttributes<SVGSVGElement>>
  title: string;
  value: number;
  footer: {
    color: string;
    value: string;
    label: string;
  };
}

export interface StatisticsChartData {
  type: string;
  title: string;
  description: string;
  footer: string;
  height: number;
  chart: {
    background: string,
    toolbar: {
      show: boolean;
      zoom: {
        enabled: boolean;
      };
    };
    series: {
        name: string;
        data: number[];
    }[];
    options: {
      title: {
        show: boolean;
      };
      dataLabels: {
        enabled: boolean;
      };
      colors: string[];
      stroke: {
        lineCap: string;
        curve: string;
      };
      markers: {
        size: number;
      };
      xaxis: {
        categories: string[];
        axisTicks: {
          show: boolean;
        };
        axisBorder: {
          show: boolean;
        };
        labels: {
          style: {
            colors: string;
            fontSize: string;
            fontFamily: string;
            fontWeight: number;
          };
        };
      };
      yaxis: {
        labels: {
          style: {
            colors: string;
            fontSize: string;
            fontFamily: string;
            fontWeight: number;
          };
        };
      };
      grid: {
        show: boolean;
        borderColor: string;
        strokeDashArray: number;
        xaxis: {
          lines: {
            show: boolean;
          };
        };
        padding: {
          top: number;
          right: number;
        };
      };
      fill: {
        opacity: number;
      };
      tooltip: {
        theme: string;
      };
    };
  };
}
