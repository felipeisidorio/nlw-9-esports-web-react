import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Check, GameController } from "phosphor-react";
import { Input } from "./Form/Input";

interface Game {
    id: string;
    title: string;
}

export function CreateAdModal() {
    const [games, setGames] = useState<Game[]>([]);
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        console.log(useVoiceChannel);

        if (!data.name) return

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`,
                {
                    name: data.name,
                    discord: data.discord,
                    yearsPlaying: Number(data.yearsPlaying),
                    weekDays: weekDays.map(Number),
                    hourStart: data.hourStart,
                    hourEnd: data.hourEnd,
                    useVoiceChannel: useVoiceChannel
                }
            );
            alert('Sucesso');
        } catch (error) {
            alert('Error');
            console.log(error);
        }
    }

    useEffect(() => {
        axios('http://localhost:3333/games/')
            .then(response => {
                setGames(response.data);
            })
    }, [])

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
            <Dialog.Content
                className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25"
            >
                <Dialog.Title
                    className="text-3xl font-black"
                >
                    Public um anúncio
                </Dialog.Title>
                <form
                    onSubmit={handleCreateAd}
                    className="mt-8 flex flex-col gap-4"
                >
                    <div className=" flex flex-col gap-2">
                        <label
                            htmlFor="game"
                            className="font-semibold"
                        >
                            Qual o game?
                        </label>
                        <select
                            id="game"
                            name="game"
                            className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
                        >
                            <option
                                disabled
                                selected
                                value=""
                            >
                                Selecione o game que deseja jogar
                            </option>

                            {
                                games.map(game => {
                                    return (
                                        <option
                                            key={game.id}
                                            value={game.id}
                                        >
                                            {game.title}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Seu nome (ou nickname)</label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Como te chamam dentro do game"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-6">

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="yearsPlaying"
                            >
                                Joga a quantos anos?
                            </label>
                            <Input
                                id="yearsPlaying"
                                name="yearsPlaying"
                                type="number"
                                placeholder="Tudo bem ser Zero"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="discord">Qual seu Discord?</label>
                            <Input
                                id="discord"
                                name="discord"
                                type="text"
                                placeholder="Usuario#000"
                            />
                        </div>
                    </div>
                    <div className="flex gap-6 ">
                        <div className=" flex flex-col gap-2 ">
                            <label htmlFor="weekDays">
                                Quando costuma jogar?
                            </label>

                            <ToggleGroup.Root
                                className=" grid grid-cols-4 gap-2"
                                type="multiple"
                                onValueChange={setWeekDays}
                                value={weekDays}
                            >
                                <ToggleGroup.Item
                                    className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    value={'0'}
                                    title="Domingo"
                                >
                                    D
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    value={'1'}
                                    title="Segunda-feira"
                                >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    value={'2'}
                                    title="Terça-feira"
                                >
                                    T
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    value={'3'}
                                    title="Quart-feira"
                                >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    value={'4'}
                                    title="Quinta-feira"
                                >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    value={'5'}
                                    title="Sexta-feira"
                                >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    value={'6'}
                                    title="Sábado"
                                >
                                    S
                                </ToggleGroup.Item>
                            </ToggleGroup.Root>
                        </div>
                        <div className=" flex flex-col gap-2 flex-1">
                            <label htmlFor="hourStart">
                                Qual horário do dia?
                            </label>
                            <div className=" grid grid-cols-2 gap-2">
                                <Input
                                    name="hourStart"
                                    id="hourStart"
                                    type="time" placeholder="De"
                                />
                                <Input
                                    name="hourEnd"
                                    id="hourEnd"
                                    type="time" placeholder="Até"
                                />
                            </div>
                        </div>
                    </div>
                    <label className="mt-2 flex items-center gap-2 text-sm">
                        <Checkbox.Root
                            checked={useVoiceChannel}
                            onCheckedChange={(checked) => {
                                checked ?
                                    setUseVoiceChannel(true)
                                    : setUseVoiceChannel(false)
                            }}
                            className="w-6 h-6 p-1 rounded bg-zinc-900"
                        >
                            <Checkbox.Indicator>
                                <Check
                                    className="w-4 h-4 text-emerald-400"
                                ></Check>
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Costumo me conectar ao  chat de voz
                    </label>
                    <footer className="flex mt-4 justify-end gap-4">
                        <Dialog.Close
                            className="bg-zinc-500 px-5 h-12 rounded-md font-semibold  hover:bg-zinc-600"
                            type="button"
                        >
                            Cancelar
                        </Dialog.Close>
                        <button
                            className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                            type="submit"
                        >
                            <GameController size={24} />
                            Encontrar
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}