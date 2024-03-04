const { Client, SlashCommandBuilder, EmbedBuilder,PermissionFlagsBits, ButtonBuilder, ActionRowBuilder, ButtonStyle, AttachmentBuilder, ApplicationCommandOptionType, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket-sistemi')
        .setDescription('Ticket sistemini kurarsın')
        .addChannelOption(option =>
            option.setName('kanal')
                .setDescription('Ticket mesajı hangi kanalda olsun?')
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName('kategori')
                .setDescription('Ticketler hangi kategoride açılsın?')
                .setRequired(true)
    ),

    run: async (client, interaction, args) => {

        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
            return interaction.reply({ content: "Bu komutu kullanmak için 'Kanalları Yönet' yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const data = interaction.options.getChannel("kanal");
        const data2 = interaction.options.getChannel("kategori")

        const kanal = interaction.guild.channels.cache.get(`${data.id}`);
        const kategori = interaction.guild.channels.cache.get(`${data2.id}`)

        if (!kanal.viewable) {
            return interaction.reply({
                content: "Belirledigin kanalı göremiyorum !",
                ephemeral: true
            })
        }

        if (kategori.type !== ChannelType.GuildCategory) {
            return interaction.reply({
                content: "Seçtiğiniz kategori geçersiz !",
                ephemeral: true
            })
        }

        if (!kategori.viewable) {
            return interaction.reply({
                content: "Belirledigin kategoriyi göremiyorum !",
                ephemeral: true
            })
        }

        if (!kategori.permissionsFor(client.user.id).has("ManageChannels")) {
            return interaction.reply({
                content: "Ticket kanalı oluşturmak için kanalları yönetme yetkisine sahip değilim.",
                ephemeral: true
            })
        }

        
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`ticket-setup-${interaction.guild.id}-${kategori.id}`)
                .setLabel('Ticket Oluştur')
                .setEmoji('1214221715203424267')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId(`fiyat-bilgisi-${interaction.guild.id}-${kategori.id}`)
                .setLabel('Fiyat Bilgisi')
                .setEmoji('1214221715203424267')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId(`diger-bilgiler-${interaction.guild.id}-${kategori.id}`)
                .setLabel('Diğer Bilgiler')
                .setEmoji('1214221715203424267')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId(`reklam-destek-${interaction.guild.id}-${kategori.id}`)
                .setLabel('Reklam Desteği Ekle')
                .setEmoji('1214221715203424267')
                .setStyle(ButtonStyle.Secondary)
        );
        const embed = new EmbedBuilder()
            .setColor(0x2B2D31)
            .setImage('https://cdn.discordapp.com/attachments/1201639274831945799/1214222228590428181/AGENTAFIS.png?ex=65f85392&is=65e5de92&hm=e662d1d9f19bcd14e7e0ced86145104a2e2347efb1560ced07c147c1ab194dea&')
            .setDescription(`<:8395memberturquoise:1213066449413734400> **Merhaba,**

            <:6584nadevelopicon:1213066443445506089> **Size daha iyi hizmet verebilmek adına lütfen aşağıdaki formu doldurarak bize talebinizi iletebilirsiniz. Mümkün olduğunca çabuk size geri dönüş yapacağız.**
            
            <:4402newmembericon:1212755020643049482> **Konu: (Ticket'in konusu - Örneğin: Ürün Sorunu, Fatura Talebi, vs.)
            Açıklama: (Sorunuz veya talebiniz hakkında detaylı bir açıklama)
            Mümkünse ekstra bilgiler veya ekran görüntüleri ekleyerek sorununuzu daha iyi anlatın. Size en kısa sürede yanıt vermek için elimizden geleni yapacağız.**
            
            <:3254boostingeight:1213066426747985950> **Teşekkürler!**
            
            
            <:71cc34c82052480591774fe9a3ab73e1:1213066483333079060> \`Developed By\` : <@921504197675991131> & <@920738699032014848> & <@726061614931116053>`);

        await interaction.reply({
            content: `Ticket sistemi başarıyla ${kanal} kanalına kuruldu.`,
            ephemeral: true
        })

        kanal.send({
            components: [button],
            embeds: [embed]
        })
    }
}