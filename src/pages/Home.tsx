import React from "react";
import { useState } from "react";
import { useSwapi } from "../hooks/swapi.hook";
import { BeatLoader } from "react-spinners";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  AppShell,
  Box,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Header,
  Image,
  Input,
  LoadingOverlay,
  Modal,
  Pagination,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import { Character } from "../types";
function Home() {
  
  const { people, setQuery, loading, count, changePage,error,refresh,fetching } = useSwapi();
  const [character, setCharacter] = useState<Character>();
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [opened, setOpened] = useState(false);
  function onCharacterClick(character: any): void {
    setOpened(true);
    setCharacter(character);
  }
  function debounce(change: string) {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        setQuery(change);
      }, 500)
    );
  }

  if(!navigator.onLine && !fetching  && people==undefined){
    return  <div className="w-full h-full flex flex-row items-center justify-center">
      <Group className="flex-row">
      <Text fw={700} lh={100}>You are offline please connect to the internet</Text>
     <Button size="md" variant="default" onClick={()=>refresh()}>Refresh</Button>
      </Group>
     </div>
   
  }
  return (
    <>
      <LoadingOverlay
        visible={loading}
        overlayBlur={0}
        loader={<BeatLoader color="blue" />}
      />
      <Flex
        className="w-full h-full"
        direction="column"
        justify={"center"}
        align={"center"}
      >
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          withCloseButton={false}
          centered
          size={
            "auto"
          }
          className="m-0"
          radius="md"
          shadow="md"
        >
          <div className="flex justify-center items-center flex-row w-full h-full   ">
            <div className="h-full  w-1/2 overflow- flex justify-center items-center">
              <Image src={character?.img} width={200} height={300} fit="contain"/>
            </div>
            <Divider orientation="vertical" mx={"md"} />
            <div className="h-full m-2 w-1/2 flex justify-start flex-row self-start">
              <div>
              <Text className="mt-4"><b>Name: </b>{character?.name}</Text>
              <Text><b>Height: </b>{character?.height}</Text>
              <Text><b>Gender: </b>{character?.gender}</Text>
              </div>
            </div>
          </div>
        </Modal>
        <Center component="div" className="w-full mt-4 md:box-border ">
          <Input
            icon={<MagnifyingGlassIcon height={20} />}
            variant="filled"
            placeholder="Search"
            className={loading?"hidden":""}
            onInput={(event) => debounce(event.currentTarget.value)}
          />
        </Center>
        <SimpleGrid
          cols={4}
          spacing="xs"
          breakpoints={[
            { maxWidth: 980, cols: 3, spacing: 'md' },
            { maxWidth: 755, cols: 2, spacing: 'sm' },
            { maxWidth: 600, cols: 1, spacing: 'sm' },
          ]}
          p={"lg"}
          className="place-items-center mt-4 rounded-full"
          verticalSpacing={"lg"}
        >
          {!loading &&
            people?.map((person, index) => (
              <Card
                className="border-2 border-solid"
                w={220}
                h={220}
                onClick={() => onCharacterClick(person)}
                key={index}
              >
                <div className="flex justify-center items-center flex-col">
                  <Image src={person.img} height={150} width={150} fit="contain" />
                  <Text className="mt-4">{person.name}</Text>
                </div>
              </Card>
            ))}
        </SimpleGrid>
        <Pagination
          total={count}
          position="center"
          onChange={changePage}
          styles={(theme) => ({
            item: {
              "&[data-active]": {
                backgroundImage: theme.fn.gradient({
                  from: "aqua",
                  to: "blue",
                }),
              },
            },
          })}
        />
      </Flex>
    </>
  );
}

export default Home;
