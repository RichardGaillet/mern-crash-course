import { Text } from "@chakra-ui/react"

const PageTitle = ({ children }) => {
  return (
    <Text
      fontSize={"30"}
      fontWeight={"bold"}
      bgGradient="to-r"
      gradientFrom="cyan.400"
      gradientTo="blue.500"
      bgClip={"text"}
      textAlign={"center"}
    >
      {children}
    </Text>
  )
}

export default PageTitle
