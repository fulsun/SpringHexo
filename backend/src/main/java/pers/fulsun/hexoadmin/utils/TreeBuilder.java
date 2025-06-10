package pers.fulsun.hexoadmin.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class TreeBuilder {
    public static <T extends TreeNode> List<T> build(List<T> nodes) {
        Map<Integer, T> nodeMap = nodes.stream()
                .collect(Collectors.toMap(TreeNode::getId, Function.identity()));

        List<T> result = new ArrayList<>();
        nodes.forEach(node -> {
            Integer parentId = node.getParentId();
            if (parentId == null || parentId == 0) {
                result.add(node);
            } else {
                T parent = nodeMap.get(parentId);
                if (parent != null) {
                    if (parent.getChildren() == null) {
                        parent.setChildren(new ArrayList<>());
                    }
                    parent.getChildren().add(node);
                }
            }
        });
        return result;
    }

    /**
     * 树节点接口
     *
     * @param <T> 节点类型
     */
    public interface TreeNode<T> {
        Integer getId();

        Integer getParentId();

        List<T> getChildren();

        void setChildren(List<T> children);
    }

}
