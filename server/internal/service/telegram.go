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