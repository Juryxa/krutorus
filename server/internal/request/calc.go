package request

type Calc struct {
	Place  string `json:"place"`
	Square string `json:"square"`
	Type   string `json:"type"`
	Name   string `json:"name,omitempty"`
	Phone  string `json:"phone"`
}
