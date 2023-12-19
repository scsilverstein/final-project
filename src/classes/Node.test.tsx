import { Node } from "./Node";
describe('Node', () => {
    it('should initialize correctly', () => {
        let id = 1
        let name = 'skiing'
        let content = 'winter sport'
        let node = new Node(id, name, content)
        expect(node).toBeDefined()
        expect(node.id).toEqual(id)
        expect(node.name).toEqual(name)
        expect(node.content).toEqual(content)
    })
})