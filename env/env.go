package env

import (
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

func init() {
	godotenv.Load()
}

func Get(key string, def string) string {
	result := os.Getenv(key)
	if result == "" {
		result = def
	}

	return result
}

func GetInt(key string, def int) int {
	result, err := strconv.ParseInt(os.Getenv(key), 10, 32)
	if err != nil {
		result = int64(def)
	}

	return int(result)
}
