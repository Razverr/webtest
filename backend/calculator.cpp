#include <napi.h>

// Example C++ calculator functions
double add(double a, double b) { return a + b; }
double subtract(double a, double b) { return a - b; }
double multiply(double a, double b) { return a * b; }
double divide(double a, double b) { return b != 0 ? a / b : 0; }

// Wrappers to make them callable from Node.js
Napi::Number AddWrapped(const Napi::CallbackInfo& info) {
	Napi::Env env = info.Env();
	double a = info[0].As<Napi::Number>();
	double b = info[1].As<Napi::Number>();
	double result = add(a, b);
	return Napi::Number::New(env, result);
}

Napi::Number SubWrapped(const Napi::CallbackInfo& info) {
	Napi::Env env = info.Env();
	double a = info[0].As<Napi::Number>();
	double b = info[1].As<Napi::Number>();
	double result = subtract(a, b);
	return Napi::Number::New(env, result);
}

Napi::Number MulWrapped(const Napi::CallbackInfo& info) {
	Napi::Env env = info.Env();
	double a = info[0].As<Napi::Number>();
	double b = info[1].As<Napi::Number>();
	double result = multiply(a, b);
	return Napi::Number::New(env, result);
}

Napi::Number DivWrapped(const Napi::CallbackInfo& info) {
	Napi::Env env = info.Env();
	double a = info[0].As<Napi::Number>();
	double b = info[1].As<Napi::Number>();
	double result = divide(a, b);
	return Napi::Number::New(env, result);
}

// Register all functions
Napi::Object Init(Napi::Env env, Napi::Object exports) {
	exports.Set("add", Napi::Function::New(env, AddWrapped));
	exports.Set("subtract", Napi::Function::New(env, SubWrapped));
	exports.Set("multiply", Napi::Function::New(env, MulWrapped));
	exports.Set("divide", Napi::Function::New(env, DivWrapped));
	return exports;
}

NODE_API_MODULE(calculator, Init)