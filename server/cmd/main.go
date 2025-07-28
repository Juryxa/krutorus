package main

import (
	"baulin_proj/internal/config"
	"baulin_proj/internal/handler"
	"baulin_proj/internal/service"
	"flag"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var (
	envPath = flag.String("env", ".env", "path to the env file")
)

func main() {
	flag.Parse()

	cfg := config.MustLoad(*envPath)
	log.Printf("CONFIG: %v\n", cfg)

	tgBot, err := service.NewTelegramService(cfg.TelegramToken)
	if err != nil {
		log.Fatal(err)
	}

	h := handler.NewHandler(tgBot, cfg.TelegramChatID)

	r := gin.Default()

	// cors conf
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{cfg.FrontCORS},
		AllowMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders: []string{
			"Origin",
			"Authorization",
			"Content-Type",
			"X-Orig-Filename",
			"X-Orig-Mime",
			"X-File-Category",
		},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	{
		r.POST("/service", h.HandleServiceRequest)
		r.POST("/layout", h.HandleLayoutRequest)
		r.POST("/calc", h.HandleCalcRequest)
	}

	if err := r.Run(":" + cfg.Port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
