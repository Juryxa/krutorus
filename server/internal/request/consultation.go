package request

type Layout struct {
	ProjectType string `json:"projectType"`
	Name        string `json:"name,omitempty"`
	Phone       string `json:"phone"`
}

