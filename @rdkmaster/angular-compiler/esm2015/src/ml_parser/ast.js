/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AstPath } from '../ast_path';
export class NodeWithI18n {
    constructor(sourceSpan, i18n) {
        this.sourceSpan = sourceSpan;
        this.i18n = i18n;
    }
}
export class Text extends NodeWithI18n {
    constructor(value, sourceSpan, i18n) {
        super(sourceSpan, i18n);
        this.value = value;
    }
    visit(visitor, context) {
        return visitor.visitText(this, context);
    }
}
export class Expansion extends NodeWithI18n {
    constructor(switchValue, type, cases, sourceSpan, switchValueSourceSpan, i18n) {
        super(sourceSpan, i18n);
        this.switchValue = switchValue;
        this.type = type;
        this.cases = cases;
        this.switchValueSourceSpan = switchValueSourceSpan;
    }
    visit(visitor, context) {
        return visitor.visitExpansion(this, context);
    }
}
export class ExpansionCase {
    constructor(value, expression, sourceSpan, valueSourceSpan, expSourceSpan) {
        this.value = value;
        this.expression = expression;
        this.sourceSpan = sourceSpan;
        this.valueSourceSpan = valueSourceSpan;
        this.expSourceSpan = expSourceSpan;
    }
    visit(visitor, context) {
        return visitor.visitExpansionCase(this, context);
    }
}
export class Attribute extends NodeWithI18n {
    constructor(name, value, sourceSpan, valueSpan, i18n) {
        super(sourceSpan, i18n);
        this.name = name;
        this.value = value;
        this.valueSpan = valueSpan;
    }
    visit(visitor, context) {
        return visitor.visitAttribute(this, context);
    }
}
export class Element extends NodeWithI18n {
    constructor(name, attrs, children, sourceSpan, startSourceSpan = null, endSourceSpan = null, i18n) {
        super(sourceSpan, i18n);
        this.name = name;
        this.attrs = attrs;
        this.children = children;
        this.startSourceSpan = startSourceSpan;
        this.endSourceSpan = endSourceSpan;
    }
    visit(visitor, context) {
        return visitor.visitElement(this, context);
    }
}
export class Comment {
    constructor(value, sourceSpan) {
        this.value = value;
        this.sourceSpan = sourceSpan;
    }
    visit(visitor, context) {
        return visitor.visitComment(this, context);
    }
}
export function visitAll(visitor, nodes, context = null) {
    const result = [];
    const visit = visitor.visit ?
        (ast) => visitor.visit(ast, context) || ast.visit(visitor, context) :
        (ast) => ast.visit(visitor, context);
    nodes.forEach(ast => {
        const astResult = visit(ast);
        if (astResult) {
            result.push(astResult);
        }
    });
    return result;
}
export class RecursiveVisitor {
    constructor() { }
    visitElement(ast, context) {
        this.visitChildren(context, visit => {
            visit(ast.attrs);
            visit(ast.children);
        });
    }
    visitAttribute(ast, context) { }
    visitText(ast, context) { }
    visitComment(ast, context) { }
    visitExpansion(ast, context) {
        return this.visitChildren(context, visit => {
            visit(ast.cases);
        });
    }
    visitExpansionCase(ast, context) { }
    visitChildren(context, cb) {
        let results = [];
        let t = this;
        function visit(children) {
            if (children)
                results.push(visitAll(t, children, context));
        }
        cb(visit);
        return Array.prototype.concat.apply([], results);
    }
}
function spanOf(ast) {
    const start = ast.sourceSpan.start.offset;
    let end = ast.sourceSpan.end.offset;
    if (ast instanceof Element) {
        if (ast.endSourceSpan) {
            end = ast.endSourceSpan.end.offset;
        }
        else if (ast.children && ast.children.length) {
            end = spanOf(ast.children[ast.children.length - 1]).end;
        }
    }
    return { start, end };
}
export function findNode(nodes, position) {
    const path = [];
    const visitor = new class extends RecursiveVisitor {
        visit(ast, context) {
            const span = spanOf(ast);
            if (span.start <= position && position < span.end) {
                path.push(ast);
            }
            else {
                // Returning a value here will result in the children being skipped.
                return true;
            }
        }
    };
    visitAll(visitor, nodes);
    return new AstPath(path, position);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL21sX3BhcnNlci9hc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGFBQWEsQ0FBQztBQVNwQyxNQUFNLE9BQWdCLFlBQVk7SUFDaEMsWUFBbUIsVUFBMkIsRUFBUyxJQUFlO1FBQW5ELGVBQVUsR0FBVixVQUFVLENBQWlCO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBVztJQUFHLENBQUM7Q0FFM0U7QUFFRCxNQUFNLE9BQU8sSUFBSyxTQUFRLFlBQVk7SUFDcEMsWUFBbUIsS0FBYSxFQUFFLFVBQTJCLEVBQUUsSUFBZTtRQUM1RSxLQUFLLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRFAsVUFBSyxHQUFMLEtBQUssQ0FBUTtJQUVoQyxDQUFDO0lBQ0QsS0FBSyxDQUFDLE9BQWdCLEVBQUUsT0FBWTtRQUNsQyxPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTyxTQUFVLFNBQVEsWUFBWTtJQUN6QyxZQUNXLFdBQW1CLEVBQVMsSUFBWSxFQUFTLEtBQXNCLEVBQzlFLFVBQTJCLEVBQVMscUJBQXNDLEVBQUUsSUFBZTtRQUM3RixLQUFLLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRmYsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBaUI7UUFDMUMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFpQjtJQUU5RSxDQUFDO0lBQ0QsS0FBSyxDQUFDLE9BQWdCLEVBQUUsT0FBWTtRQUNsQyxPQUFPLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE9B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YUFDYjtRQUNILENBQUM7S0FDRixDQUFDO0lBRUYsUUFBUSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUV6QixPQUFPLElBQUksT0FBTyxDQUFPLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMzQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0FzdFBhdGh9IGZyb20gJy4uL2FzdF9wYXRoJztcbmltcG9ydCB7STE4bk1ldGF9IGZyb20gJy4uL2kxOG4vaTE4bl9hc3QnO1xuaW1wb3J0IHtQYXJzZVNvdXJjZVNwYW59IGZyb20gJy4uL3BhcnNlX3V0aWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5vZGUge1xuICBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW47XG4gIHZpc2l0KHZpc2l0b3I6IFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueTtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE5vZGVXaXRoSTE4biBpbXBsZW1lbnRzIE5vZGUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgaTE4bj86IEkxOG5NZXRhKSB7fVxuICBhYnN0cmFjdCB2aXNpdCh2aXNpdG9yOiBWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnk7XG59XG5cbmV4cG9ydCBjbGFzcyBUZXh0IGV4dGVuZHMgTm9kZVdpdGhJMThuIHtcbiAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBzdHJpbmcsIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbiwgaTE4bj86IEkxOG5NZXRhKSB7XG4gICAgc3VwZXIoc291cmNlU3BhbiwgaTE4bik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogVmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdFRleHQodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEV4cGFuc2lvbiBleHRlbmRzIE5vZGVXaXRoSTE4biB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHN3aXRjaFZhbHVlOiBzdHJpbmcsIHB1YmxpYyB0eXBlOiBzdHJpbmcsIHB1YmxpYyBjYXNlczogRXhwYW5zaW9uQ2FzZVtdLFxuICAgICAgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgc3dpdGNoVmFsdWVTb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sIGkxOG4/OiBJMThuTWV0YSkge1xuICAgIHN1cGVyKHNvdXJjZVNwYW4sIGkxOG4pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRFeHBhbnNpb24odGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEV4cGFuc2lvbkNhc2UgaW1wbGVtZW50cyBOb2RlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgdmFsdWU6IHN0cmluZywgcHVibGljIGV4cHJlc3Npb246IE5vZGVbXSwgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbixcbiAgICAgIHB1YmxpYyB2YWx1ZVNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbiwgcHVibGljIGV4cFNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge31cblxuICB2aXNpdCh2aXNpdG9yOiBWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0RXhwYW5zaW9uQ2FzZSh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQXR0cmlidXRlIGV4dGVuZHMgTm9kZVdpdGhJMThuIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgdmFsdWU6IHN0cmluZywgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLFxuICAgICAgcHVibGljIHZhbHVlU3Bhbj86IFBhcnNlU291cmNlU3BhbiwgaTE4bj86IEkxOG5NZXRhKSB7XG4gICAgc3VwZXIoc291cmNlU3BhbiwgaTE4bik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogVmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdEF0dHJpYnV0ZSh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRWxlbWVudCBleHRlbmRzIE5vZGVXaXRoSTE4biB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIGF0dHJzOiBBdHRyaWJ1dGVbXSwgcHVibGljIGNoaWxkcmVuOiBOb2RlW10sXG4gICAgICBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sIHB1YmxpYyBzdGFydFNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbnxudWxsID0gbnVsbCxcbiAgICAgIHB1YmxpYyBlbmRTb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW58bnVsbCA9IG51bGwsIGkxOG4/OiBJMThuTWV0YSkge1xuICAgIHN1cGVyKHNvdXJjZVNwYW4sIGkxOG4pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRFbGVtZW50KHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21tZW50IGltcGxlbWVudHMgTm9kZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogc3RyaW5nfG51bGwsIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHt9XG4gIHZpc2l0KHZpc2l0b3I6IFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRDb21tZW50KHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmlzaXRvciB7XG4gIC8vIFJldHVybmluZyBhIHRydXRoeSB2YWx1ZSBmcm9tIGB2aXNpdCgpYCB3aWxsIHByZXZlbnQgYHZpc2l0QWxsKClgIGZyb20gdGhlIGNhbGwgdG8gdGhlIHR5cGVkXG4gIC8vIG1ldGhvZCBhbmQgcmVzdWx0IHJldHVybmVkIHdpbGwgYmVjb21lIHRoZSByZXN1bHQgaW5jbHVkZWQgaW4gYHZpc2l0QWxsKClgcyByZXN1bHQgYXJyYXkuXG4gIHZpc2l0Pyhub2RlOiBOb2RlLCBjb250ZXh0OiBhbnkpOiBhbnk7XG5cbiAgdmlzaXRFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRBdHRyaWJ1dGUoYXR0cmlidXRlOiBBdHRyaWJ1dGUsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRUZXh0KHRleHQ6IFRleHQsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRDb21tZW50KGNvbW1lbnQ6IENvbW1lbnQsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRFeHBhbnNpb24oZXhwYW5zaW9uOiBFeHBhbnNpb24sIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRFeHBhbnNpb25DYXNlKGV4cGFuc2lvbkNhc2U6IEV4cGFuc2lvbkNhc2UsIGNvbnRleHQ6IGFueSk6IGFueTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZpc2l0QWxsKHZpc2l0b3I6IFZpc2l0b3IsIG5vZGVzOiBOb2RlW10sIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnlbXSB7XG4gIGNvbnN0IHJlc3VsdDogYW55W10gPSBbXTtcblxuICBjb25zdCB2aXNpdCA9IHZpc2l0b3IudmlzaXQgP1xuICAgICAgKGFzdDogTm9kZSkgPT4gdmlzaXRvci52aXNpdCEoYXN0LCBjb250ZXh0KSB8fCBhc3QudmlzaXQodmlzaXRvciwgY29udGV4dCkgOlxuICAgICAgKGFzdDogTm9kZSkgPT4gYXN0LnZpc2l0KHZpc2l0b3IsIGNvbnRleHQpO1xuICBub2Rlcy5mb3JFYWNoKGFzdCA9PiB7XG4gICAgY29uc3QgYXN0UmVzdWx0ID0gdmlzaXQoYXN0KTtcbiAgICBpZiAoYXN0UmVzdWx0KSB7XG4gICAgICByZXN1bHQucHVzaChhc3RSZXN1bHQpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBjbGFzcyBSZWN1cnNpdmVWaXNpdG9yIGltcGxlbWVudHMgVmlzaXRvciB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICB2aXNpdEVsZW1lbnQoYXN0OiBFbGVtZW50LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMudmlzaXRDaGlsZHJlbihjb250ZXh0LCB2aXNpdCA9PiB7XG4gICAgICB2aXNpdChhc3QuYXR0cnMpO1xuICAgICAgdmlzaXQoYXN0LmNoaWxkcmVuKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZpc2l0QXR0cmlidXRlKGFzdDogQXR0cmlidXRlLCBjb250ZXh0OiBhbnkpOiBhbnkge31cbiAgdmlzaXRUZXh0KGFzdDogVGV4dCwgY29udGV4dDogYW55KTogYW55IHt9XG4gIHZpc2l0Q29tbWVudChhc3Q6IENvbW1lbnQsIGNvbnRleHQ6IGFueSk6IGFueSB7fVxuXG4gIHZpc2l0RXhwYW5zaW9uKGFzdDogRXhwYW5zaW9uLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnZpc2l0Q2hpbGRyZW4oY29udGV4dCwgdmlzaXQgPT4ge1xuICAgICAgdmlzaXQoYXN0LmNhc2VzKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZpc2l0RXhwYW5zaW9uQ2FzZShhc3Q6IEV4cGFuc2lvbkNhc2UsIGNvbnRleHQ6IGFueSk6IGFueSB7fVxuXG4gIHByaXZhdGUgdmlzaXRDaGlsZHJlbjxUIGV4dGVuZHMgTm9kZT4oXG4gICAgICBjb250ZXh0OiBhbnksIGNiOiAodmlzaXQ6ICg8ViBleHRlbmRzIE5vZGU+KGNoaWxkcmVuOiBWW118dW5kZWZpbmVkKSA9PiB2b2lkKSkgPT4gdm9pZCkge1xuICAgIGxldCByZXN1bHRzOiBhbnlbXVtdID0gW107XG4gICAgbGV0IHQgPSB0aGlzO1xuICAgIGZ1bmN0aW9uIHZpc2l0PFQgZXh0ZW5kcyBOb2RlPihjaGlsZHJlbjogVFtdfHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGNoaWxkcmVuKSByZXN1bHRzLnB1c2godmlzaXRBbGwodCwgY2hpbGRyZW4sIGNvbnRleHQpKTtcbiAgICB9XG4gICAgY2IodmlzaXQpO1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFtdLCByZXN1bHRzKTtcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBIdG1sQXN0UGF0aCA9IEFzdFBhdGg8Tm9kZT47XG5cbmZ1bmN0aW9uIHNwYW5PZihhc3Q6IE5vZGUpIHtcbiAgY29uc3Qgc3RhcnQgPSBhc3Quc291cmNlU3Bhbi5zdGFydC5vZmZzZXQ7XG4gIGxldCBlbmQgPSBhc3Quc291cmNlU3Bhbi5lbmQub2Zmc2V0O1xuICBpZiAoYXN0IGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgIGlmIChhc3QuZW5kU291cmNlU3Bhbikge1xuICAgICAgZW5kID0gYXN0LmVuZFNvdXJjZVNwYW4uZW5kLm9mZnNldDtcbiAgICB9IGVsc2UgaWYgKGFzdC5jaGlsZHJlbiAmJiBhc3QuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICBlbmQgPSBzcGFuT2YoYXN0LmNoaWxkcmVuW2FzdC5jaGlsZHJlbi5sZW5ndGggLSAxXSkuZW5kO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge3N0YXJ0LCBlbmR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZE5vZGUobm9kZXM6IE5vZGVbXSwgcG9zaXRpb246IG51bWJlcik6IEh0bWxBc3RQYXRoIHtcbiAgY29uc3QgcGF0aDogTm9kZVtdID0gW107XG5cbiAgY29uc3QgdmlzaXRvciA9IG5ldyBjbGFzcyBleHRlbmRzIFJlY3Vyc2l2ZVZpc2l0b3Ige1xuICAgIHZpc2l0KGFzdDogTm9kZSwgY29udGV4dDogYW55KTogYW55IHtcbiAgICAgIGNvbnN0IHNwYW4gPSBzcGFuT2YoYXN0KTtcbiAgICAgIGlmIChzcGFuLnN0YXJ0IDw9IHBvc2l0aW9uICYmIHBvc2l0aW9uIDwgc3Bhbi5lbmQpIHtcbiAgICAgICAgcGF0aC5wdXNoKGFzdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSZXR1cm5pbmcgYSB2YWx1ZSBoZXJlIHdpbGwgcmVzdWx0IGluIHRoZSBjaGlsZHJlbiBiZWluZyBza2lwcGVkLlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmlzaXRBbGwodmlzaXRvciwgbm9kZXMpO1xuXG4gIHJldHVybiBuZXcgQXN0UGF0aDxOb2RlPihwYXRoLCBwb3NpdGlvbik7XG59XG4iXX0=