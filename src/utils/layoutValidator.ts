export default (string: string) => /^[a-z 0-9-=[\];',./~!@#$%^&*()_+{}|:"<>?]/gi.test(string)
