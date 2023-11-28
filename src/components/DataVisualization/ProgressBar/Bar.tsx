import { Box } from "@chakra-ui/react";

interface BarSection {
  mode: string;
  color?: string;
  widthPercentage: number;
}

interface Props {
  categories: BarSection[];
  widthPercentage: number;
}

function Bar(props: Props) {
  const { categories, widthPercentage } = props;

  return (
    <Box display="flex" width={`${widthPercentage}%`}>
      {categories.map((category) => (
        <Box
          width={`${category.widthPercentage * 100}%`}
          h="20px"
          bg={category.color}
        />
      ))}
    </Box>
  );
}

export default Bar;
