package service

import (
	"github.com/PaulSonOfLars/gotgbot/v2"
)

type telegramService struct {
	bot *gotgbot.Bot
}

func NewTelegramService(botToken string) (*telegramService, error) {
	bot, err := gotgbot.NewBot(botToken, nil)
	if err != nil {
		return nil, err
	}
	return &telegramService{bot: bot}, nil
}

func (s *telegramService) SendNotification(chatID int64, message string) error {
	_, err := s.bot.SendMessage(chatID, message, nil)
	return err
}

// func (tg *telegramService) StartTelegramPolling(chatID int64) {
// 	updater := ext.NewUpdater(nil)
// 	dispatcher := updater.Dispatcher

// 	commandHandler := handlers.NewCommand("start", func(b *gotgbot.Bot, ctx *ext.Context) error {
// 		user := ctx.EffectiveUser
// 		args := ctx.Args()

// 		source := "unknown"
// 		if len(args) > 0 {
// 			source = args[0]
// 		}

// 		msg := fmt.Sprintf(
// 			"Новый пользователь запустил бота\n\n🆔 UserID: %d\n📍 Откуда: %s",
// 			user.ID, source,
// 		)
// 		if _, err := b.SendMessage(chatID, msg, nil); err != nil {
// 			return err
// 		}

// 		_, _ = b.SendMessage(user.ID, "Спасибо, скоро с вами свяжутся!", nil)
// 		return nil
// 	})

// 	dispatcher.Start(commandHandler) // correct method :contentReference[oaicite:4]{index=4}

// 	log.Println("Telegram polling started…")
// 	if err := updater.StartPolling(tg.bot, nil); err != nil {
// 		log.Fatalf("Telegram polling error: %v", err)
// 	}
// }
