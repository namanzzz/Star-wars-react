'use client'
import { FaUserCircle } from "react-icons/fa";

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'


export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
    
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>Star Wars</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={<FaUserCircle />
                    }
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={<FaUserCircle />}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Naman Matoliya</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem><a href="https://www.linkedin.com/in/namanm21/" target="__blank">LinkedIn</a></MenuItem>
                  <MenuItem><a href="https://www.github.com/namanzzz" target="__blank">Github</a></MenuItem>
                  <MenuItem> <a href="https://swapi.dev/api/people/" target="__blank"> View API</a></MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

