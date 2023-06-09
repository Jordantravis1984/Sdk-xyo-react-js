import { ModuleDescription, ModuleWrapper } from '@xyo-network/module'
import { NodeWrapper } from '@xyo-network/node'
import { ElementDefinition } from 'cytoscape'

import { parseModuleType } from './lib'

export class CytoscapeElements {
  static MaxNameLength = 20

  static async buildChild(wrapper: NodeWrapper, address: string) {
    const [result] = await wrapper.resolveWrapped(ModuleWrapper, { address: [address] })
    const description = await result.describe()
    return CytoscapeElements.buildNode(description)
  }

  static buildEdge(rootNode: ElementDefinition, newNode: ElementDefinition) {
    return {
      data: {
        id: `${rootNode.data.id}/${newNode.data.id}`,
        source: rootNode.data.id,
        target: newNode.data.id,
      },
    }
  }

  static async buildElements(wrapper: NodeWrapper) {
    try {
      const [description, newRootNode] = await CytoscapeElements.buildRootNode(wrapper)
      const newElements: ElementDefinition[] = [newRootNode]

      const children = description.children
      await Promise.allSettled(
        (children ?? [])?.map(async (address) => {
          try {
            const newNode = await CytoscapeElements.buildChild(wrapper, address)
            newElements.push(newNode)

            const newEdge = CytoscapeElements.buildEdge(newRootNode, newNode)
            newElements.push(newEdge)
          } catch (e) {
            console.error('Error parsing children', e)
          }
        }),
      )
      return newElements
    } catch (e) {
      console.error('Error Getting initial description', e)
    }
  }

  static buildNode(description: ModuleDescription): ElementDefinition {
    const newNodeId = CytoscapeElements.normalizeName(description.name) ?? description.address.substring(0, 8)
    return {
      data: {
        address: description.address,
        id: newNodeId,
        type: parseModuleType(description.queries),
      },
    }
  }

  static buildRootNode = async (wrapper: NodeWrapper): Promise<[ModuleDescription, ElementDefinition]> => {
    const description = await wrapper?.describe()
    return [description, CytoscapeElements.buildNode(description)]
  }

  static normalizeName(name?: string) {
    if (!name) return
    if (name.length > this.MaxNameLength) return `${name.substring(0, 20)}...`
    return name
  }
}
