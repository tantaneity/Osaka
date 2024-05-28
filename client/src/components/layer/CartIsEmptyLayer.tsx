import { Button, Typography } from "@material-tailwind/react"

const CartIsEmptyLayer: React.FC = () => {
    return (
        <div className="h-screen mx-auto grid text-center px-8">
        <div>
          <img className="w-[200px] h-[200px] mx-auto" src="\src\assets\empty_cart_osaka.png"/>
          <Typography
            variant="h1"
            color="blue-gray"
            className="mt-10 !text-3xl !leading-snug md:!text-4xl"
          >
            Cart is empty
          </Typography>
          <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
            Take a look, you will definitely find something in our catalog
          </Typography>
          <a href="/">
            <Button color="gray" className="w-full px-4 md:w-[8rem]">
                Drinks
            </Button>
          </a>
          
        </div>
      </div>
    )
}

export default CartIsEmptyLayer