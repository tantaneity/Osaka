import { Card, IconButton, Typography } from "@material-tailwind/react";

export function ProductPageSkeleton() {
  return (
    <section className="py-8 px-4 sm:px-8">
      <div className="mx-auto container grid place-items-center gap-8 grid-cols-1 lg:grid-cols-2">
        <Card className="w-full max-w-md lg:max-w-xl min-h-[32rem] flex flex-col justify-between animate-pulse">
          <div className="rounded-xl h-96 w-full relative flex-auto bg-gray-300"></div>
        </Card>

        <Card className="w-full max-w-md lg:max-w-xl min-h-[32rem] flex flex-col justify-between p-6 animate-pulse">
          <div>
            <Typography className="mb-4" variant="h3">
              &nbsp;
            </Typography>
            <Typography variant="h5" className="bg-gray-300 h-8 w-20 rounded-full mb-4">
              &nbsp;
            </Typography>
            <Typography className="text-base font-normal leading-7 text-gray-500 mb-4">
              &nbsp;
            </Typography>
            <div className="my-8 flex items-center gap-2">
              <div className="bg-gray-300 h-4 w-16 rounded-full">&nbsp;</div>
              <Typography className="text-sm font-bold text-gray-700">
                &nbsp;
              </Typography>
            </div>
            <Typography className="text-base font-normal leading-7 text-gray-500">
              <strong>Category:</strong> &nbsp;
            </Typography>
            <Typography className="text-base font-normal leading-7 text-gray-500">
              <strong>Stock:</strong> &nbsp;
            </Typography>
          </div>
          <div className="my-4 flex w-full items-center gap-3">
            <button disabled className="bg-gray-300 h-10 w-full lg:w-52 rounded-full cursor-not-allowed">
              &nbsp;
            </button>
            <IconButton disabled variant="text" className="shrink-0 cursor-not-allowed">
              &nbsp;
            </IconButton>
          </div>
          <div className="my-4 flex w-full items-center gap-3">
            <button disabled className="bg-gray-300 h-10 w-full lg:w-52 rounded-full cursor-not-allowed">
              &nbsp;
            </button>
            <button disabled className="bg-gray-300 h-10 w-full lg:w-52 rounded-full cursor-not-allowed">
              &nbsp;
            </button>
          </div>
        </Card>
      </div>
    </section>
  );
}
