package utils

import (
	"baulin_proj/internal/request"
	"fmt"
)

func CreateServiceTgMsg(req request.ServiceReq) string {
	if req.Name == "" || req.Name == " " {
		req.Name = "не указано"
	}
	return fmt.Sprintf(
		"📋 Новая заявка!\n\n"+
			"👤 Имя: %s\n"+
			"🔹 Услуга: %s\n"+
			"🔹 Тип: %s\n"+
			"📞 Телефон: %s",
		req.Name, req.Service, req.Type, req.Phone,
	)
}

func CreateLayoutTgMsg(req request.Layout) string {
	if req.Name == "" || req.Name == " " {
		req.Name = "не указано"
	}

	return fmt.Sprintf(
		"📋 Новая заявка!\n\n"+
			"👤 Имя: %s\n"+
			"🔹 Проект: %s\n"+
			"📞 Телефон: %s",
		req.Name, req.ProjectType, req.Phone,
	)
}

func CreateCalcTgMsg(req request.Calc) string {
	if req.Name == "" || req.Name == " " {
		req.Name = "не указано"
	}

	return fmt.Sprintf(
		"📋 Новая заявка на рассчет стоимости!\n\n"+
			"👤 Имя: %s\n"+
			"🔹 Место: %s\n"+
			"🔹 Площадь: %s\n"+
			"🔹 Тип ремонта: %s\n"+
			"📞 Телефон: %s",
		req.Name, req.Place, req.Square, req.Type, req.Phone,
	)
}
