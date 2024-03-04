const client = require('../bot');
const { ActionRowBuilder, ButtonBuilder, ChannelType, EmbedBuilder, Events,ModalBuilder, TextInputBuilder, TextInputStyle, ButtonStyle, InteractionType } = require('discord.js');

module.exports = {
    name: "ticketCreate"
};

module.exports = {
    name: Events.InteractionCreate,
    execute: async (interaction) => {

        if (interaction.isButton()) {
            if (interaction.customId.startsWith(`ticket-setup-${interaction.guild.id}`)) {
                const id = interaction.customId.split('-')[3]

                const modal = new ModalBuilder()
                    .setCustomId(`modal-${interaction.guild.id}-${id}`)
                    .setTitle(`${interaction.guild.name}'s Ticket`);

                const ticketreason = new TextInputBuilder()
                    .setCustomId(`ticket-reason`)
                    .setLabel("Ticket Açma Nedeniniz ?")
                    .setPlaceholder("Buraya nedeninizi yazınız.")
                    .setStyle(TextInputStyle.Short)
                    .setMinLength(10)
                    .setMaxLength(1000);

                const firstActionRow = new ActionRowBuilder().addComponents(ticketreason);

                modal.addComponents(firstActionRow);

                await interaction.showModal(modal);
            }
            
                    if (interaction.isButton()) {
                        if (interaction.customId.startsWith(`fiyat-bilgisi-${interaction.guild.id}`)) {
                            const id = interaction.customId.split('-')[3]
            
                            const modal = new ModalBuilder()
                                .setCustomId(`modal-${interaction.guild.id}-${id}`)
                                .setTitle(`${interaction.guild.name}'s Ticket`);
            
                            const ticketreason = new TextInputBuilder()
                                .setCustomId(`ticket-reason`)
                                .setLabel("Fiyat bilgisi Talebi Açmak için birşey yazın")
                                .setPlaceholder("Buraya nedeninizi yazınız.")
                                .setStyle(TextInputStyle.Short)
                                .setMinLength(10)
                                .setMaxLength(1000);
            
                            const firstActionRow = new ActionRowBuilder().addComponents(ticketreason);
            
                            modal.addComponents(firstActionRow);
            
                            await interaction.showModal(modal);
                        }
                    }

                    if (interaction.isButton()) {
                        if (interaction.customId.startsWith(`diger-bilgiler-${interaction.guild.id}`)) {
                            const id = interaction.customId.split('-')[3]
            
                            const modal = new ModalBuilder()
                                .setCustomId(`modal-${interaction.guild.id}-${id}`)
                                .setTitle(`${interaction.guild.name}'s Ticket`);
            
                            const ticketreason = new TextInputBuilder()
                                .setCustomId(`ticket-reason`)
                                .setLabel("Diğer konular için açın")
                                .setPlaceholder("Buraya nedeninizi yazınız.")
                                .setStyle(TextInputStyle.Short)
                                .setMinLength(10)
                                .setMaxLength(1000);
            
                            const firstActionRow = new ActionRowBuilder().addComponents(ticketreason);
            
                            modal.addComponents(firstActionRow);
            
                            await interaction.showModal(modal);
                        }
                    }

                    if (interaction.isButton()) {
                        if (interaction.customId.startsWith(`reklam-destek-${interaction.guild.id}`)) {
                            const id = interaction.customId.split('-')[3]
            
                            const modal = new ModalBuilder()
                                .setCustomId(`modal-${interaction.guild.id}-${id}`)
                                .setTitle(`${interaction.guild.name}'s Ticket`);
            
                            const ticketreason = new TextInputBuilder()
                                .setCustomId(`ticket-reason`)
                                .setLabel("Reklam Yaptırmak için birşey yazın")
                                .setPlaceholder("Buraya nedeninizi yazınız.")
                                .setStyle(TextInputStyle.Short)
                                .setMinLength(10)
                                .setMaxLength(1000);
            
                            const firstActionRow = new ActionRowBuilder().addComponents(ticketreason);
            
                            modal.addComponents(firstActionRow);
            
                            await interaction.showModal(modal);
                        }
                    }

            if (interaction.customId.startsWith(`soru`)) {
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`close-ticket-${interaction.user.id}`)
                            .setLabel("Evet")
                            .setEmoji('1212755034597490758')
                            .setStyle(ButtonStyle.Secondary)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`no-close`)
                            .setLabel("Hayır")
                            .setEmoji('1213083645183529042')
                            .setStyle(ButtonStyle.Secondary)
                    )
                const embed = new EmbedBuilder()
                    .setDescription(`Ticketi kapatmak istediginden eminmisin?`)
                    .setTimestamp()
                    .setColor("#2f3136")

                interaction.reply({
                    content: `${interaction.user}`,
                    components: [row],
                    embeds: [embed]
                })
            }
            if (interaction.customId === `no-close`) {
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`soru-${interaction.user.id}`)
                            .setLabel("Ticketi Kapat")
                            .setEmoji('1213066443445506089')
                            .setStyle(ButtonStyle.Secondary)
                    )

                const embed = new EmbedBuilder()
                    .setDescription(`Ticket kapatılmadı. İşlemine devam et!`)
                    .setTimestamp()
                    .setColor("#2f3136")

                await interaction.update({
                    content: `${interaction.user}`,
                    components: [row],
                    embeds: [embed]
                })
            }
            if (interaction.customId === `ticketSil`) {
                const channel = interaction.channel;
                channel.delete();
            }
            if (interaction.customId.startsWith(`close-ticket`)) {
                await interaction.deferUpdate()
                const id = interaction.customId.split('-')[2];

                const user = interaction.guild.members.cache.get(`${id}`);
                const channel = interaction.guild.channels.cache.get(`${interaction.channel.id}`)

                if (!(interaction.user.id === user.user.id || channel.permissionsFor(interaction.user.id).has("ManageChannels"))) {
                    return interaction.followUp({
                        content: `Ticketi kapatma yetkiniz yok.`,
                        ephemeral: true
                    })
                }

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("close-ticket")
                            .setLabel("Ticketi Kapat")
                            .setEmoji('1213066443445506089')
                            .setStyle(ButtonStyle.Secondary)
                            .setDisabled(true)
                    )

                interaction.editReply({
                    components: [row]
                })

                await channel.setName(`closed-${channel.name.split("-")[1]}`)
                channel.permissionOverwrites.edit(user, {
                    ViewChannel: false
                }).then(() => {
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('-')
                                .setLabel("Ticket Kapatıldı")
                                .setEmoji('1213066459941703690')
                                .setStyle(ButtonStyle.Secondary)
                                .setDisabled(true)
                        )
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('ticketSil')
                                .setLabel("Ticketi Sil")
                                .setEmoji('1214221717640315001')
                                .setStyle(ButtonStyle.Secondary)
                                .setDisabled(false)
                        )
                    const embed = new EmbedBuilder()
                        .setTitle(`Ticket Kapatıldı`)
                        .setDescription(`Ticket başarıyla Kapatıldı.`)
                        .setColor("#2f3136")
                        .setTimestamp()
                    return interaction.channel.send({
                        embeds: [embed],
                        components: [row]
                    });
                }).catch(error => {
                    console.error(error);
                });
            }
        }
        if (interaction.isModalSubmit()) {
            if (interaction.customId.startsWith(`modal-${interaction.guild.id}`)) {
                const id = interaction.customId.split('-')[2]

                const reason = interaction.fields.getTextInputValue('ticket-reason');

                const category = interaction.guild.channels.cache.get(`${id}`)

                await interaction.guild.channels.create({
                    parent: category.id,
                    name: `ticket-${interaction.user.username}`,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: ['ViewChannel'],
                        },
                        {
                            id: interaction.user.id,
                            allow: ['SendMessages', 'ViewChannel']
                        }
                    ],
                    type: ChannelType.GuildText,
                }).then(async c => {
                    interaction.reply({
                        content: `Ticket başarıyla açıldı ! <#${c.id}>`,
                        ephemeral: true
                    });

                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`soru-${interaction.user.id}`)
                                .setLabel("Ticketi Kapat")
                                .setEmoji('1214221717640315001')
                                .setStyle(ButtonStyle.Secondary)
                        )

                    const embed = new EmbedBuilder()
                        .setTitle(`Yetkililerin cevaplamasını bekleyiniz.`)
                        .setAuthor({ name: `${interaction.user.username}'nin Ticketi`, iconURL: interaction.user.displayAvatarURL() })
                        .setDescription(`Ticketiniz oluşturduğunuz için teşekkürler, yetkililer ticketinize bakana kadar sabırlı olun.`)
                        .setTimestamp()
                        .addFields(
                            { name: "Ticket Açılma Nedeni : ", value: `${reason}` }
                        )
                        .setColor("#2f3136")

                    c.send({
                        content: `${interaction.user}`,
                        components: [row],
                        embeds: [embed]
                    })

                })
            }
        }
    }
}
