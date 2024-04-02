import { useQueue } from "discord-player";
import { SocketUser } from "../socket.js";
import type { Socket } from "socket.io";
import { PlayerMetadata } from "#bot/player/PlayerMetadata";
import { EmbedGenerator } from "#bot/utils/EmbedGenerator";

export async function PauseAction(
    info: SocketUser,
    socket: Socket,
    paused: boolean
) {
    const queue = useQueue<PlayerMetadata>(info.guildId);
    if (!queue?.connection) return socket.disconnect(true);

    queue.node.setPaused(paused);

    const state = queue.node.isPaused() ? 'paused' : 'resumed';

    await queue.metadata.channel.send({
        embeds: [EmbedGenerator.Success({
            title: `Track ${state}!`,
            description: `The track was ${state} by ${info.displayName} (<@${info.id}>).`,
        })],
    });

    socket.to(info.guildId).emit('pause', queue.node.isPaused());
}
