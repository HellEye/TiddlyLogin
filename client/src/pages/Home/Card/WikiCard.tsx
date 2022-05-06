import { EditIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react'
import { WikiWithAccess } from '../../../types'

type Props = {
  wiki: WikiWithAccess
}

const WikiCard = ({ wiki }: Props) => {
  return (
    <Box position="relative">
      {wiki.canEdit?<EditIcon position="absolute" right="3" top="3"/>:""}
    <Flex
      direction='column'
      bg='bg.500'
      border="1px solid"
      padding="1em"
      borderColor="accent.500"
      width="20rem"
      borderRadius="1rem"
      
      onClick={() => {
        //TODO go to wiki
        window.open(`http://localhost:6062/wiki/${wiki.name}`)
      }}
    >
      <Heading fontSize="2xl" mb="5">{wiki.name}</Heading>
      
      <Text whiteSpace="break-spaces">{ wiki.description }</Text>
      </Flex>
      </Box>
  )
}

export default WikiCard